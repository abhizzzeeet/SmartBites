// package com.example.fooddelivery.fooddelivery.configs;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class CorsConfig implements WebMvcConfigurer {

//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/api/**")  // This pattern will apply to all your API routes
//                 .allowedOrigins("*")  // Allow frontend at localhost:3000
//                 .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allowed HTTP methods
//                 .allowedHeaders("*")  // Allow all headers
//                 .allowCredentials(true);  // Allow credentials (cookies, headers, etc.)
//     }
// }
