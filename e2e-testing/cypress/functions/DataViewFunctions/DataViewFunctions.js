import DataViewLocators from '../../locators/DataViewLocators';
import LoginFunctions from '../LoginFunctions';

const loginFunctions = new LoginFunctions();

class DataViewFunctions {
  click_data_view_btn() {
    cy.get(DataViewLocators.dataViewBtn).click();
    cy.url().should('include', '/feed');
  }

  verify_post_appears_for_user() {
    this.click_data_view_btn();
    //check post appears for admin user
    cy.get(DataViewLocators.postPreview)
      .children(DataViewLocators.postItem)
      .contains('Automated Title Response')
      .click();
    cy.get(DataViewLocators.postMenuDots).eq(0).click();
    cy.get(DataViewLocators.publishPostBtn).click();
    loginFunctions.logout();
    //check post appears for non logged in user
    this.click_data_view_btn();
    cy.get(DataViewLocators.postPreview)
      .children(DataViewLocators.postItem)
      .contains('Automated Title Response');
  }

  verify_bulk_actions_delete_posts() {
    this.click_data_view_btn();
    cy.wait(1000);
    //check delete post in the page with bulk actions
    cy.get('button:contains("Bulk Actions")').click();
    cy.get(DataViewLocators.postPreview)
      .children(DataViewLocators.postItem)
      .contains('Automated Title Response')
      .find('.mat-checkbox-input')
      .click();
    cy.get('button:contains("Delete")').click({ force: true });
    cy.get('#confirm-modal').click();
    cy.get(DataViewLocators.confirmDeleteBtn).click();
    cy.get(DataViewLocators.successBtn).click();
    //verify post deleted
    cy.get(DataViewLocators.postPreview)
      .children(DataViewLocators.postItem)
      .contains('Automated Title Response')
      .should('not.exist');
  }
}

export default DataViewFunctions;
