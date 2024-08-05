package com.egginhealth.util;


import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Component
@NoArgsConstructor(access = lombok.AccessLevel.PRIVATE)
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


    public static void updateRoleInSecurityContext(String role) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Map<String, Object> principal = Map.of(
                "id", getUserId(),
                "role", role
        );

        Authentication authToken = new UsernamePasswordAuthenticationToken(principal, null, Collections.singleton(new SimpleGrantedAuthority(role)));
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }
}
