interface WordForm {
    // form: string;
    pos: string;
    person?: string;
    number?: string;
    tense?: string;
    mood?: string;
    voice?: string;
    gender?: string;
    case?: string;
    degree?: string;
}

interface WordFormsData {
    [form: string]: WordForm[];
}
