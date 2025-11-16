# BoticarioStore

Guia de referência rápida para entender, evoluir e manter o catálogo online desenvolvido em React.

## Visão Geral
- Catálogo responsivo que apresenta produtos, filtros por categorias e busca textual, direcionando a conversão via WhatsApp.
- Front-end criado com Create React App, Material UI e Font Awesome para ícones sociais.
- Informações de produtos e canais de contato centralizadas em `src/data.json`.

## Arquitetura e Fluxo
- **Componente raiz** `src/App.js`: carrega dados, embaralha produtos, agrupa categorias e controla estado global de busca/filtros.
- **Filtro lateral** `src/components/sidebar/sidebar.jsx`: renderiza supercategorias, categorias e flags (`Promotion`, `Launch`).
- **Busca** `src/components/search/searchbar.jsx`: atualiza `searchValue` em tempo real.
- **Cards** `src/components/product/productCard.jsx`: mostra produto, tamanhos (quando aplicável), modal com imagem ampliada e CTA para WhatsApp configurado.
- **Links sociais** `src/components/links/links.jsx` e **identidade visual** `src/components/logo/logo.jsx`: alimentados por `config` em `data.json`.

### Estrutura de Pastas
```
src/
	App.js            # Composição da página e lógica de filtro/busca
	data.json         # Base de produtos + canais de contato
	index.js          # Bootstrap do React
	index.css         # Variáveis de tema e layout global
	reset.css         # Reset de estilos
	components/
		sidebar/
		search/
		product/
		links/
		logo/
```

## Dados e Configuração (`src/data.json`)
- `products[]`: lista de produtos com flags `Promotion`, `Launch`, tamanhos (`P`, `M`, `G`, `GG`, `XG`) e hierarquia de categorias (`Category` → `SuperCategory`).
- `config`: valores dinâmicos para WhatsApp, Instagram, Facebook e título exibido pelo componente `Logo`.
- Para acrescentar novos canais ou campos, mantenha a tipagem consistente; ajuste os componentes que consumirem o novo dado.

## Estilos e UX
- Variáveis globais em `index.css` controlam paleta escura, cores de destaque e tipografia (`DM Sans`).
- Layout responsivo garantido via media queries próprias dos componentes e grid MUI em `App.js`.
- Use sempre as variáveis (`var(--nome)`) para cores. Evite valores hex diretamente em novos estilos.
- Banners de promoção e tamanhos são definidos em `productCard.css`; preserve contraste acessível.

## Fluxo de Desenvolvimento
1. `npm install` para instalar dependências.
2. `npm start` inicia o ambiente local em modo desenvolvimento.
3. `npm run build` gera a versão otimizada para deploy estático.
- React 19 está em uso; evite APIs legadas (`ReactDOM.render`).
- O projeto não utiliza TypeScript nem gerenciamento de estado externo; priorize hooks nativos.

## Boas Práticas
- Novos componentes devem seguir o padrão modular (`.jsx` + `.css`) dentro de `src/components/<nome>/`.
- Centralize lógica de dados em `App.js`; componentes filhos devem receber props declarativas.
- Prefira funções puras e derive estados complexos com `useMemo` quando necessário.
- Valide entradas do usuário antes de filtrar dados para evitar exceções em tempo de execução.

## Checklist de QA
- [ ] Filtros por categoria, promoção e lançamento funcionam e podem ser combinados.
- [ ] Busca textual retorna resultados case-insensitive.
- [ ] Botões e links abrem WhatsApp/Instagram/Facebook corretos com mensagens pré-formatadas.
- [ ] Modal do produto abre e fecha em desktops e mobile sem overflow.
- [ ] Layout responde bem em larguras de 320px, 768px e 1280px.

## Próximos Passos Sugeridos
- Implementar testes básicos com React Testing Library para garantir comportamento de filtros e busca.
- Adicionar camadas de loading e tratamento de erro caso `data.json` seja carregado via requisição futura.
- Considerar extração dos dados para uma API ou CMS para facilitar manutenção de catálogo.
