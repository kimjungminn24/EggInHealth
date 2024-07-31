package com.egginhealth.util;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;

@Component
public class SecurityUtil {

    public static int getUserId() {
        return getPrincipal()
                .map(principal -> Integer.parseInt((String) principal.get("id")))
                .orElseThrow(() -> new RuntimeException("User Id not found in security context"));
    }

    public static String getUserRole() {
        return getPrincipal()
                .map(principal -> (String) principal.get("role"))
                .orElseThrow(() -> new RuntimeException("User role not found in security context"));
    }

    private static Optional<Map<String, String>> getPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Map) {
            return Optional.of((Map<String, String>) authentication.getPrincipal());
        }
        return Optional.empty();
    }
}
