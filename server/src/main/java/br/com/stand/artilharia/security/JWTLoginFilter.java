package br.com.stand.artilharia.security;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import br.com.stand.artilharia.exception.InvalidCredentialsExeception;
import br.com.stand.artilharia.model.Credential;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

  public JWTLoginFilter(String url, AuthenticationManager authManager) {
    super(new AntPathRequestMatcher(url));
    setAuthenticationManager(authManager);
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
      throws IOException {

    Credential credentials = new ObjectMapper().readValue(request.getInputStream(), Credential.class);
    try {
      return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(credentials.getUsername(),
          credentials.getPassword(), Collections.emptyList()));
    } catch (Exception e) {
      log.info(e);
      throw new InvalidCredentialsExeception("Login Inválido", "crie um usuário para logar",
          "error.credential.invalid");
    }

  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain, Authentication auth) {

    TokenAuthenticationService.addAuthentication(response, auth.getName());
  }

}
