package br.com.stand.artilharia.service;

import java.util.Optional;
import java.util.Set;

import com.google.common.collect.Sets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ResolvableType;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.stand.artilharia.exception.NotFoundException;

public class DefaultService<R extends JpaRepository<C, Long>, C> {
    @Autowired
    protected R repo;

    public C findOne(Long id) {
        Optional<C> obj = repo.findById(id);
        ResolvableType resolvableType = ResolvableType.forClass(repo.getClass()).as(JpaRepository.class);
        return obj.orElseThrow(() -> new NotFoundException("Não encontrado",
                String.format("Não foi encontrado, id:%s ", id), String.format("error.%s.notfound",
                        resolvableType.getGeneric(0).getRawClass().getSimpleName().toLowerCase())));
    }

    public Set<C> listAll() {
        return Sets.newHashSet(repo.findAll());
    }
}