package br.com.stand.artilharia.service;

import br.com.stand.artilharia.repository.CredentialRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  private CredentialRepository repository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) {
    return repository.findCredentialByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found with username  " + username));
  }

  // This method is used by JWTAuthenticationFilter
  @Transactional
  public UserDetails loadUserById(Long id) {
    return repository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id));
  }
}
