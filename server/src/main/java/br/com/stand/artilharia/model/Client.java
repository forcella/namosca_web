package br.com.stand.artilharia.model;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.stand.artilharia.view.UserView;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Client implements Serializable {
  private static final long serialVersionUID = -7838886369520351317L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @JsonView({ UserView.List.class })
  private Long id;

  @OneToOne
  @JsonView({ UserView.Get.class })
  private Credential credentials;

  @JsonView({ UserView.Get.class })
  private String firtstName;

  @JsonView({ UserView.Get.class })
  private String lastName;

  @JsonView({ UserView.Get.class })
  private Long rg;

  @JsonView({ UserView.Get.class })
  private Long cpf;

  @JsonView({ UserView.Get.class })
  private Long phone;

  @JsonView({ UserView.Get.class })
  private LocalDate bornDate;

  @JsonView({ UserView.Get.class })
  public String getFullName() {
    return String.format("%s %s", firtstName, lastName);
  }
}
