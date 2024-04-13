export enum Dias {
    Domingo = 0,
    Segunda = 1,
    Terca = 2,
    Quarta = 3,
    Quinta = 4,
    Sexta = 5,
    Sabado = 6
}

export namespace Dias {
    export function toString(dia: Dias): string {
        switch (dia) {
            case Dias.Domingo:
                return 'Domingo';
            case Dias.Segunda:
                return 'Segunda-feira';
            case Dias.Terca:
                return 'Terça-feira';
            case Dias.Quarta:
                return 'Quarta-feira';
            case Dias.Quinta:
                return 'Quinta-feira';
            case Dias.Sexta:
                return 'Sexta-feira';
            case Dias.Sabado:
                return 'Sábado';
            default:
                throw new Error('Dia inválido');
        }
    }
}