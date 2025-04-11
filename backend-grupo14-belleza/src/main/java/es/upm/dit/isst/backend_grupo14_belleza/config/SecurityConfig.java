package es.upm.dit.isst.backend_grupo14_belleza.config;

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
            .csrf().disable() // Desactiva CSRF para permitir POST desde Postman
            .authorizeRequests()
            .requestMatchers("/**").authenticated() // Requiere autenticación para todas las rutas
            .and()
            .httpBasic(); // Activa la autenticación básica

        return http.build();
    }
}