package br.com.stand.artilharia.model;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;

import br.com.stand.artilharia.view.UserView;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Cliente implements Serializable, Modelo {
  private static final long serialVersionUID = -7838886369520351317L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @JsonView({ UserView.List.class })
  private Long id;

  @JsonView({ UserView.Get.class })
  @NotEmpty(message = "Primeiro nome  não pode ser vazio")
  private String primeiroNome;

  @JsonView({ UserView.Get.class })
  @NotEmpty(message = "Sobrenome  não pode ser vazio")
  private String ultimoNome;

  @JsonView({ UserView.Get.class })
  @NotNull(message = "RG  não pode ser vazio")
  private Long rg;

  @JsonView({ UserView.Get.class })
  @NotNull(message = "CPF  não pode ser vazio")
  private Long cpf;

  @JsonView({ UserView.Get.class })
  @NotNull(message = "Telefone não pode ser vazio")
  private Long telefone;

  @JsonView({ UserView.Get.class })
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  @NotNull(message = "Data de nascimento não pode ser vazia")
  private LocalDate dataNascimento;

  @JsonView({ UserView.Get.class })
  public String getNomeCompleto() {
    return String.format("%s %s", primeiroNome, ultimoNome);
  }
}
