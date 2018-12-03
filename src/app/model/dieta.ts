export class Dieta {
    prato: string;
    quantidade: number;
    calorias: number; // Preço fixo

    domingo?: boolean;
    segunda?: boolean;
    terca?: boolean;
    quarta?: boolean;
    quinta?: boolean;
    sexta?: boolean;
    sabado?: boolean;

    constructor(
        prato: string = '',
        quantidade: number = 1,
        calorias: number = 0,
        domingo: boolean = false,
        segunda: boolean = false,
        terca: boolean = false,
        quarta: boolean = false,
        quinta: boolean = false,
        sexta: boolean = false,
        sabado: boolean = false
    ) {
        this.prato = prato;
        this.quantidade = quantidade;
        this.calorias = calorias;

        this.domingo = domingo;
        this.segunda = segunda;
        this.terca = terca;
        this.quarta = quarta;
        this.quinta = quinta;
        this.sexta = sexta;
        this.sabado = sabado;
    }
}
