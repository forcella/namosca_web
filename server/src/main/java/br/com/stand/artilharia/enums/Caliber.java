package br.com.stand.artilharia.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum Caliber {
    CAL_38("38"), CAL_9MM("9MM"), CAL_388("388"), CAL_4_5("4.5"), CAL_22("22");

    @Getter
    private final String name;

    @Override
    public String toString() {
        return super.name();
    }
}