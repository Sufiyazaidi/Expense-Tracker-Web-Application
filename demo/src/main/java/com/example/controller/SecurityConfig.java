package com.example.controller;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()  // Enable CORS
            .csrf().disable() // Disable CSRF protection for API calls
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/expenses/**").permitAll() // Allow all requests to /expenses
                .anyRequest().authenticated()
            );

        return http.build();
    }
}



