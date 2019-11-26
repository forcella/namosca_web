package br.com.stand.artilharia.repository;

import br.com.stand.artilharia.model.Credential;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CredentialRepository extends JpaRepository<Credential, Long> {

  Optional<Credential> findCredentialByEmail(String email);

  @Override
  <S extends Credential> S save(S s);
}
