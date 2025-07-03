# Cotação Manager - Outlook Add-in

Este projeto consiste em uma extensão para o Outlook que automatiza o processamento de e-mails de cotações, integrando com LLaMA 3.2 e um sistema ERP.

## Componentes

1. **Office Add-in (Frontend)**

   - Desenvolvido com TypeScript/React
   - Integração com Microsoft Graph API
   - Interface para configuração e monitoramento

2. **Backend API**
   - ASP.NET Core Web API
   - Integração com LLaMA 3.2
   - Processamento de e-mails
   - Integração com sistema ERP

## Requisitos

- Node.js 16+
- .NET 6.0 SDK
- Visual Studio 2022 ou VS Code
- Outlook (Web, Desktop ou Mobile)
- Acesso ao servidor LLaMA 3.2
- Acesso ao sistema ERP

## Configuração

### Backend API

1. Clone o repositório
2. Navegue até a pasta `CotacaoManager.API`
3. Configure as URLs no `appsettings.json`:
   - LLaMA API URL
   - ERP API URL
4. Execute o projeto:
   ```bash
   dotnet run
   ```

### Office Add-in

1. Navegue até a pasta `CotacaoManager`
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
4. Sideload o add-in no Outlook:
   - Siga as instruções oficiais da Microsoft para sideload de add-ins.

## Uso

1. Configure o add-in no Outlook
2. Crie uma pasta "Cotações" no Outlook
3. Configure regras para mover e-mails relevantes para esta pasta
4. O add-in processará automaticamente os e-mails:
   - Extração de dados via LLaMA 3.2
   - Envio para o sistema ERP
   - Movimentação para pasta "Cotações_Processadas"

## Estrutura do Projeto

```
├── CotacaoManager/           # Office Add-in
│   ├── src/
│   ├── manifest.xml
│   └── package.json
│
└── CotacaoManager.API/       # Backend API
    ├── Controllers/
    ├── Models/
    ├── Services/
    └── Program.cs
```

## Integração com LLaMA 3.2

O sistema envia o conteúdo do e-mail para a API do LLaMA 3.2, que retorna os dados estruturados em formato JSON.

## Integração com ERP

Os dados extraídos são enviados para o sistema ERP via API REST.

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NomeDaFeature`)
3. Commit suas mudanças (`git commit -m 'Descrição da feature'`)
4. Push para a branch (`git push origin feature/NomeDaFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.
