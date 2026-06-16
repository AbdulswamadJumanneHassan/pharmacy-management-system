package com.pharmalink.pms.auth.service;

import com.pharmalink.pms.auth.dto.LoginRequest;
import com.pharmalink.pms.auth.dto.LoginResponse;
import com.pharmalink.pms.auth.entity.RefreshToken;
import com.pharmalink.pms.auth.entity.User;
import com.pharmalink.pms.auth.repository.RefreshTokenRepository;
import com.pharmalink.pms.auth.repository.UserRepository;
import com.pharmalink.pms.common.exceptions.UnauthorizedException;
import com.pharmalink.pms.config.security.jwt.JwtService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;

    @Transactional
    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        User user = (User) authentication.getPrincipal();

        // Revoke existing refresh tokens
        refreshTokenRepository.revokeAllByUserId(user.getId());

        // Generate tokens
        String accessToken = jwtService.generateAccessToken(user);
        String refreshTokenValue = jwtService.generateRefreshTokenValue();

        // Persist refresh token
        refreshTokenRepository.save(RefreshToken.builder()
                .user(user)
                .token(refreshTokenValue)
                .expiresAt(LocalDateTime.now().plusSeconds(
                        jwtService.getRefreshTokenExpirationMs() / 1000))
                .revoked(false)
                .build());

        // Update last login
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        log.info("User {} logged in successfully with role {}", user.getEmail(), user.getPrimaryRole());

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshTokenValue)
                .tokenType("Bearer")
                .expiresIn(jwtService.getRefreshTokenExpirationMs() / 1000)
                .userId(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getPrimaryRole())
                .pharmacyId(user.getPharmacy() != null ? user.getPharmacy().getId() : null)
                .pharmacyName(user.getPharmacy() != null ? user.getPharmacy().getName() : null)
                .superAdmin(user.isSuperAdmin())
                .build();
    }

    @Transactional
    public LoginResponse refreshToken(String rawRefreshToken) {
        RefreshToken stored = refreshTokenRepository.findByToken(rawRefreshToken)
                .orElseThrow(() -> new UnauthorizedException("Invalid refresh token"));

        if (stored.isRevoked() || stored.isExpired()) {
            throw new UnauthorizedException("Refresh token has expired or been revoked");
        }

        // Rotate: revoke old, issue new
        stored.setRevoked(true);
        refreshTokenRepository.save(stored);

        User user = stored.getUser();
        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshTokenValue = jwtService.generateRefreshTokenValue();

        refreshTokenRepository.save(RefreshToken.builder()
                .user(user)
                .token(newRefreshTokenValue)
                .expiresAt(LocalDateTime.now().plusSeconds(
                        jwtService.getRefreshTokenExpirationMs() / 1000))
                .revoked(false)
                .build());

        return LoginResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshTokenValue)
                .tokenType("Bearer")
                .expiresIn(jwtService.getRefreshTokenExpirationMs() / 1000)
                .userId(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getPrimaryRole())
                .pharmacyId(user.getPharmacy() != null ? user.getPharmacy().getId() : null)
                .pharmacyName(user.getPharmacy() != null ? user.getPharmacy().getName() : null)
                .superAdmin(user.isSuperAdmin())
                .build();
    }

    @Transactional
    public void logout(String rawRefreshToken) {
        refreshTokenRepository.findByToken(rawRefreshToken)
                .ifPresent(rt -> {
                    rt.setRevoked(true);
                    refreshTokenRepository.save(rt);
                    log.info("User {} logged out", rt.getUser().getEmail());
                });
    }
}
