const TOP_BAR_SELECTOR = '.header';
const TRYBEWARTS_LOGO_SELECTOR = 'img.trybewarts-header-logo';
const TRYBEWARTS_HEADER_TITLE = 'h1#trybewarts-header-title';
const TRYBEWARTS_LOGIN_FORM_SELECTOR = 'form.trybewarts-login';
const EVALUATION_FORM = 'form#evaluation-form';
const USER_NAME_INPUT_SELECTOR = 'input#input-name';
const USER_LASTNAME_INPUT_SELECTOR = 'input#input-lastname';
const USER_EMAIL_INPUT_SELECTOR = 'input#input-email';
const TRYBEWARTS_LOGO_FORMS_SELECTOR = 'img#trybewarts-forms-logo';
const LABEL_FAMILY_TEXT = 'Qual sua família?';
const LABEL_CONTENT_TEXT = 'Qual conteúdo você está com mais vontade de aprender?';
const LABEL_RATE_TEXT = 'Como você avalia a Trybewarts?';
const LABEL_TEXTAREA = 'Deixe seu comentário:';
const HOUSES_SELECTOR = '#house';

before(() => {
  cy.configureLayoutInspector({
      excludePadding: true,
      threshold: 5,
  });
});

describe('Trybewarts', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  describe('1 - Crie uma barra verde na parte superior da página', () => {
    it('A barra possui a classe `header`', () => {
      cy.get(TOP_BAR_SELECTOR).should('exist');
    });

    it('A classe `header` deve determinar que o elemento é um flex container', () => {
      cy.get(TOP_BAR_SELECTOR).should('have.css', 'display', 'flex');
    });

    it('A classe header deve possuir a propriedade `background-color: rgb(50, 167, 145)`', () => {
      cy.get(TOP_BAR_SELECTOR).should('have.css', 'background-color', 'rgb(50, 167, 145)');
    });
  });

  describe('2 - Adicione o logotipo da Trybewarts com a classe `trybewarts-header-logo` na barra superior', () => {
    it('Existe um elemento img com a classe `trybewarts-header-logo`', () => {
      cy.get(TRYBEWARTS_LOGO_SELECTOR).should('exist');
    });

    it('O atributo src do logotipo aponta para images/trybewarts-header-logo.svg', () => {
      cy.get(TRYBEWARTS_LOGO_SELECTOR)
        .should('have.attr', 'src')
        .and('match', /images\/trybewarts-header-logo\.svg/);
    });
  });

  describe('3 - Acrescente um formulário de login no canto direito da barra superior contendo os inputs de email, senha e um botão de login', () => {
    it('Existe um formulário com a classe "trybewarts-login"', () => {
      cy.get(TRYBEWARTS_LOGIN_FORM_SELECTOR).should('exist');
    });

    it('Existe um input com o atributo name igual a "email" e o placeholder igual a "Email"', () => {
      cy.get(`${TRYBEWARTS_LOGIN_FORM_SELECTOR} input[name=email]`)
        .should('have.attr', 'placeholder')
        .and('match', /Email/)
    });

    it('Existe um input com o atributo name igual a "password" e o placeholder igual a "Senha"', () => {
      cy.get(`${TRYBEWARTS_LOGIN_FORM_SELECTOR} input[name=password]`)
        .should('have.attr', 'placeholder')
        .and('match', /Senha/)
    });

    it('Existe um botão que contém o texto "Entrar"', () => {
      cy.get(`${TRYBEWARTS_LOGIN_FORM_SELECTOR} button`)
        .should('have.text', 'Entrar');
    });

    it('O formulário é um flex container', () => {
      cy.get(TRYBEWARTS_LOGIN_FORM_SELECTOR).should('have.css', 'display', 'flex');
    });

    it('O formulário deve estar a direita da logo', () => {
      cy.get(TRYBEWARTS_LOGIN_FORM_SELECTOR).should('be.rightOf', TRYBEWARTS_LOGO_SELECTOR);
    })

    it('Ao clicar no botão com login ou senha válidos, emite um alerta contendo o texto "Olá, Tryber!"', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get(`${TRYBEWARTS_LOGIN_FORM_SELECTOR} input[name=email]`).type('tryber@teste.com');
      cy.get(`${TRYBEWARTS_LOGIN_FORM_SELECTOR} input[name=password]`).type('123456');
      cy.get(`${TRYBEWARTS_LOGIN_FORM_SELECTOR} button`).click().then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Olá, Tryber!');
      });
    });

    it('Ao clicar no botão com email ou senha inválidos, emite um alerta contendo o texto "Email ou senha inválidos."', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get(`${TRYBEWARTS_LOGIN_FORM_SELECTOR} button`).click().then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Email ou senha inválidos.');
      });
    });
  });

  describe('4 - Crie um título com o texto `Trybewarts` centralizado dentro do `Header`', () => {
    it('Existe um elemento h1 com o id "trybewarts-header-title" e texto "Trybewarts', () => {
      cy.get(TRYBEWARTS_HEADER_TITLE).should('exist')
        .and('have.text', 'Trybewarts');
    });

    it('O header deve ter exatamente três elementos filhos', () => {
      cy.get(TOP_BAR_SELECTOR).children().should('have.length', 3);
    });

    it('O filho do meio deve ser o título', () => {
      cy.get(TOP_BAR_SELECTOR).children().eq(1).should('match', TRYBEWARTS_HEADER_TITLE);
    });
  });

  describe('5 - Adicione um formulário no corpo da página', () => {
    it('Existe um formulário com o id `evaluation-form`', () => {
      cy.get(EVALUATION_FORM).should('exist');
    });

    it('O formulário está inserido dentro de uma tag `main`', () => {
      cy.get(`main ${EVALUATION_FORM}`).should('exist');
    });

    it('O elemento main é um flex-container', () => {
      cy.get('main').should('have.css', 'display', 'flex');
    });

    it('O formulário é um flex-container', () => {
      cy.get(EVALUATION_FORM).should('have.css', 'display', 'flex');
    });

    it('O formulário tem a largura igual a 675px', () => {
      cy.get(EVALUATION_FORM).should('have.css', 'width', '675px');
    });
  });

  describe('6 - Faça com que o eixo principal do formulário seja vertical', () => {
    it('O eixo principal do formulário com id "evaluation-form" é vertical', () => {
      cy.get(EVALUATION_FORM).should('have.css', 'flex-direction', 'column');
    });
  });

  describe('7 - Adicione a logo da Trybewarts no lado direito da página', () => {
    it('Possui o id trybewarts-forms-logo', () => {
      cy.get(TRYBEWARTS_LOGO_FORMS_SELECTOR).should('exist');
    });

    it('O atributo `src` do logotipo aponta para `images/trybewarts-colored.svg`', () => {
      cy.get(TRYBEWARTS_LOGO_FORMS_SELECTOR)
        .should('have.attr', 'src')
        .and('match', /images\/trybewarts-colored\.svg/);
    });

    it('A imagem deve possuir um `height` de `500px`', () => {
      cy.get(TRYBEWARTS_LOGO_FORMS_SELECTOR)
        .should('have.css', 'height', '500px')
    });

    it('A imagem deve estar posicionada a direita do formulário com id `evaluation-form`', () => {
      cy.get(TRYBEWARTS_LOGO_FORMS_SELECTOR)
        .should('be.rightOf', EVALUATION_FORM);
    });
  });

  describe('8 - Acrescente ao formulário com id `evaluation-form` os inputs de `nome, sobrenome e email`', () => {
    const INPUTS = [
      { placeholder: 'Nome', id: 'input-name' },
      { placeholder: 'Sobrenome', id: 'input-lastname' },
      { placeholder: 'Email', id: 'input-email' },
    ];

    INPUTS.forEach(({ placeholder, id }) => {
      it(`Existe um input com o id "${id}" e placeholder "${placeholder}"`, () => {
        cy.get(`input#${id}`).should('exist')
          .and('have.attr', 'placeholder', placeholder);
      });
    });
  });

  describe('9 - Acrescente ao formulário um select com o id `house` contendo as opções `Gitnória`, `Reactpuff`, `Corvinode` e `Pytherina`', () => {
    beforeEach(() => cy.get(EVALUATION_FORM).as('houses'));

    const HOUSES = [
      { name: 'Gitnória', id: 'gitnoria-house' },
      { name: 'Reactpuff', id: 'reactpuff-house' },
      { name: 'Corvinode', id: 'corvinode-house' },
      { name: 'Pytherina', id: 'pytherina-house' },
    ];

    HOUSES.forEach(({ name, id }) => {
      it(`Existe uma option com text e value igual a "${name}" e id igual a "${id}"`, () => {
        cy.get(`${HOUSES_SELECTOR} option#${id}`).then((option) => {
          expect(option).to.have.text(name);
          expect(option).to.have.value(name);
        });
      });
    });
  });

  describe('10 - Posicione os campos de `Nome` e `Sobrenome` para que fiquem em linha', () => {
    it('O campo de "Sobrenome" está a direita do campo de "Nome"', () => {
      cy.get(USER_LASTNAME_INPUT_SELECTOR).should('be.rightOf', USER_NAME_INPUT_SELECTOR);
    });
  });

  describe('11 - Posicione os campos de `Email` e `Casa` para que fiquem em linha', () => {
    it('O select das casas está a direita do campo de "Email"', () => {
      cy.get(HOUSES_SELECTOR).should('be.rightOf', USER_EMAIL_INPUT_SELECTOR);
    });
  });

  describe('12 - Acrescente ao formulário um campo de entrada para qual família a pessoa estudante se identifica', () => {
    it('Um elemento com o id "label-family" e o texto "Qual sua família?" deverá ser criado', () => {
      cy.get(`${EVALUATION_FORM} #label-family`)
        .should('have.text', LABEL_FAMILY_TEXT);
    });

    const FAMILIES = ['Frontend', 'Backend', 'FullStack'];

    FAMILIES.forEach((family) => {
      it(`Deverá haver um input do tipo radio, com value igual a "${family}" e name igual a "family"`, () => {
        cy.get(`input[value=${family}]`)
          .should('exist')
          .and('have.attr', 'type', 'radio')
          .and('have.attr', 'name', 'family');
      });
    });

    it('Posicione os radio buttons para ficar abaixo um do outro, na sequência "Frontend", "Backend" e "Fullstack"', () => {
      cy.get('input[value="Backend"]').should('be.below', 'input[value="Frontend"]');
      cy.get('input[value="FullStack"]').should('be.below', 'input[value="Backend"]');
    });

    it('Posicione os radio buttons abaixo do label com id "label-family"', () => {
      FAMILIES.forEach((family) => {
        cy.get(`input[value="${family}"]`).should('be.below', '#label-family');
      })
    });
  });

  describe('13 - Crie campos de entrada do tipo `checkbox` contendo seis opções', () => {
    it('Existe um elemento com o id "label-content" e o texto "Qual conteúdo você está com mais vontade de aprender?"', () => {
      cy.get('#label-content').contains(LABEL_CONTENT_TEXT);
    });

    const CHECKBOXES = ['HoFs', 'Jest', 'Promises', 'React', 'SQL', 'Python'];

    CHECKBOXES.forEach((checkbox) => {
      it(`Existe uma checkbox com o value igual a ${checkbox}`, () => {
        cy.get(`${EVALUATION_FORM} input[value=${checkbox}]`).should('exist');
      });
    });

    it(`As checkboxes estão posicionadas abaixo do label com id "label-content"`, () => {
      CHECKBOXES.forEach((checkbox) => {
        cy.get(`${EVALUATION_FORM} input[value=${checkbox}]`)
          .should('be.below', `${EVALUATION_FORM} #label-content`)
      })
    });
  });

  describe('14 - Crie campo de entrada para avaliar de 1 a 10 o nível de satisfação com a Trybewarts', () => {
    it('Um elemento com o id label-rate e o texto "Como você avalia a Trybewarts?" deverá ser criado', () => {
      cy.get('#label-rate').contains(LABEL_RATE_TEXT);
    });

    it('O campo deve ser formado por dez radio buttons, contendo as opções de 1 a 10', () => {
      cy.get('input[name="rate"]')
        .its('length')
        .should('be.gt', 9);
    });

    it('Posicione os radio buttons à direita do label', () => {
      cy.get('input[value="1"]').should('be.rightOf', '#label-rate');
    });
  });

  describe('15 - Crie uma textarea com o id `textarea` e uma label com a classe `textarea` contendo o número máximo de caracteres igual à 500', () => {
    it('Uma label com a classe textarea e o texto "Deixe seu comentário:" deverá ser criado" ', () => {
      cy.get('.textarea').contains(LABEL_TEXTAREA);
    });

    it('O campo textarea deverá ter o máximo de 500 caracteres', () => {
      cy.get('textarea').type('text'.repeat(200));
      cy.get('textarea').invoke('val').should((value) => {
        expect(value).to.match(/^[a-z]{500}$/);
      });
    });
  });

  describe('16 - Crie um campo de entrada do tipo `checkbox` com o id `agreement` para validar as informações', () => {
    it('Uma label com o id "label-infos" deve possuir o texto "Você concorda com o uso das informações acima?"', () => {
      cy.get('label#label-infos')
        .should('exist')
        .contains('Você concorda com o uso das informações acima?');
    });

    it('Um input do tipo checkbox deve existir e deve possuir o id "agreement"', () => {
      cy.get('input#agreement[type="checkbox"]')
        .should('exist');
    });
  });

  describe('17 - Crie um botão de Enviar para submeter o formulário', () => {
    it('Deve existir um botão com o id "submit-btn" e o texto "Enviar"', () => {
      cy.get('button#submit-btn[type="submit"]')
        .should('exist')
        .should('have.text', 'Enviar');
    });
  });

  describe('18 - Faça com que o botão `Enviar` seja habilitado somente após a checkbox do requisito 16 ser selecionada', () => {
    it('O botão deve inicialmente estar desabilitado', () => {
      cy.get('button#submit-btn')
        .should('be.disabled');
    });

    it('Ao marcar o campo de confirmação, o botão de Enviar deve ser habilitado', () => {
      cy.get('input#agreement')
        .check();

      cy.get('button#submit-btn')
        .should('not.be.disabled');
    });
  });

  describe('19 - Crie um rodapé no final da página', () => {
    it('O rodapé deve conter o texto "Direitos reservados à Trybewarts©"', () => {
      cy.get('footer')
        .should('exist')
        .contains('Direitos reservados à Trybewarts©');
    });
  });

  describe('20 - Crie um contador com o ID `counter` contendo o número de caracteres disponíveis no textarea, variando de 500 até 0, que deverá ser atualizado a medida que algo for digitado na textarea', () => {
    it('Deve existir um contador com o ID "counter"', () => {
      cy.get('#counter').should('exist');
    });

    it('O contador de caracteres deve ser atualizado conforme o conteúdo do textarea muda.', () => {
      cy.get('#counter').contains('500');
      cy.get('#textarea').type('Salve salve família');
      cy.get('#counter').contains('481');
      cy.get('#textarea').clear();
      cy.get('#counter').should('contain', '500');
      cy.get('#textarea').type('Salve salve');
      cy.get('#counter').should('contain', '489');
    });
  });

  describe('21 - Faça com que ao clicar no botão `Enviar`, o conteúdo do formulário seja substituído pelas informações preenchidas', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'johndoe@trybe.com';
    const house = 'Reactpuff';
    const family = 'Backend';
    const rate = '10';
    const observation = 'Maaaaravilhoso';

    function fillForm() {
      cy.visit('./index.html');

      cy.get('#input-name').then(($tag) => {
        cy.wrap($tag).type(firstName);
      });

      cy.get('#input-lastname').then(($tag) => {
        cy.wrap($tag).type(lastName);
      });

      cy.get('#input-email').then(($tag) => {
        cy.wrap($tag).type(email);
      });

      cy.get('#house').then(($tag) => {
        cy.wrap($tag).select(house);
      });

      cy.get('input[name="family"]').then(($tag) => {
        cy.wrap($tag).check(family);
      });

      cy.get('.subject').then(($tag) => {
        cy.wrap($tag).check('React');
      });

      cy.get('.subject').then(($tag) => {
        cy.wrap($tag).check('Jest');
      });

      cy.get('.subject').then(($tag) => {
        cy.wrap($tag).check('SQL');
      });

      cy.get('input[name="rate"]').then(($tag) => {
        cy.wrap($tag).check(rate);
      });

      cy.get('#textarea').then(($tag) => {
        cy.wrap($tag).type(observation);
      });
    }

    beforeEach(() => {
      fillForm();
      cy.get('input#agreement').check();
      cy.get('button#submit-btn').then(($btn) => $btn.click());
    });

    it('Deve haver um texto no modelo "Nome: John Doe" (substitua John Doe pelo nome e sobrenome preenchido no formulário)', () => {
      cy.get('#evaluation-form')
        .contains(`Nome: ${firstName} ${lastName}`);
    });

    it('Deve haver um texto no modelo "Email: alguem@email.com"', () => {
      cy.get('#evaluation-form')
        .contains(`Email: ${email}`);
    });

    it('Deve haver um texto no modelo "Casa: -Casa marcada-"', () => {
      cy.get('#evaluation-form')
        .contains(`Casa: ${house}`);
    });

    it('Deve haver um texto no modelo "Família: -Família marcada-"', () => {
      cy.get('#evaluation-form')
        .contains(`Família: ${family}`);
    });

    it('Deve haver um texto no modelo "Matérias: -Matérias marcadas-"', () => {
      cy.get('#evaluation-form')
        .contains('Matérias: Jest, React, SQL');
    });

    it('Deve haver um texto no modelo "Avaliação: -Nota marcada-"', () => {
      cy.get('#evaluation-form')
        .contains(`Avaliação: ${rate}`);
    });

    it('Deve haver um texto no modelo "Observações: -Texto preenchido-"', () => {
      cy.get('#evaluation-form')
        .contains(`Observações: ${observation}`);
    });
  });
});
