package com.pharmalink.pms.auth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginResponse {

    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private long expiresIn;

    // User info
    private UUID userId;
    private String email;
    private String fullName;
    private String role;
    private UUID pharmacyId;
    private String pharmacyName;
    private boolean superAdmin;
}
