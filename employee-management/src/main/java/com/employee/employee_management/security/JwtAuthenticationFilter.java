package com.employee.employee_management.security;

import com.employee.employee_management.service.jwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final jwtService jwtService;

    public JwtAuthenticationFilter(jwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // Check whether Authorization header exists
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract JWT
        String token = authHeader.substring(7);

        try {
            // Extract email from JWT
            String email = jwtService.extractEmail(token);

            // Check whether token is valid
            if (email != null
                    && SecurityContextHolder.getContext().getAuthentication() == null
                    && jwtService.isTokenValid(token, email)) {

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                null
                        );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);
            }

        } catch (Exception e) {
            // Invalid or expired token
            System.out.println("Invalid JWT token");
        }

        filterChain.doFilter(request, response);
    }
}