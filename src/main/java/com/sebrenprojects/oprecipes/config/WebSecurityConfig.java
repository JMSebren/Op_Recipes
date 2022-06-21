package com.sebrenprojects.oprecipes.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

//import com.sebrenprojects.oprecipes.service.UserServiceImpl;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors();
		http.csrf().disable()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
			.authorizeRequests()
				.antMatchers(
						"/**",
						"/api/auth/login**",
						"/api/auth/signup**"
						)
				.permitAll()
				.anyRequest()
				.authenticated();
		http.apply(new JwtTokenConfigurer(tokenProvider));
	}
	
//	@Override
//	public void addCorsMappings(CorsRegistry registry) {
//		
//	}
	
//	@Autowired
//	UserServiceImpl userSrvc;
//	
//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		
//	}
//	
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http
//			.authorizeRequests()
//				.antMatchers(
//						HttpMethod.GET,
//						"/index*","/public/**","/*.js","/*.json","/*.ico"
//						)
//					.permitAll()
//					.anyRequest().authenticated()
//			.and()
//				.formLogin()
//					.loginPage("/index.html")
//						.loginProcessingUrl("/api/user/login")
//						.defaultSuccessUrl("/index.html",true)
//						.failureUrl("/index.html?error=true")
//			.and()
//				.logout()
//					.logoutUrl("/api/user/logout")
//					.deleteCookies("JSESSIONID")
//					.logoutSuccessHandler(logoutSuccessHandler());
//
//	}
//	
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
	
}
