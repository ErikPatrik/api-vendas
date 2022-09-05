import handlebars from 'handlebars'

interface ITemplateVariable {
    [key: string]: string | number
}

interface IParseMailTemplate {
    template: string
    variables: ITemplateVariable
}

export default class HandlebarsMailTempalte {
    public async parse({ template, variables }: IParseMailTemplate): Promise<string> {
        const parseTemplate = handlebars.compile(template)

        return parseTemplate(variables)
    }
}
