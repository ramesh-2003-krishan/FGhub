package com.FGhub.recommendation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestClient;

@SpringBootApplication
public class RecommendationApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecommendationApplication.class, args);
	}

	@Bean
	RestClient mediaRestClient(@Value("${media.service.url}") String mediaServiceUrl) {
		return RestClient.builder().baseUrl(mediaServiceUrl).build();
	}
}
