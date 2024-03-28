# Created by prana at 27/03/2024
Feature: Ecommerce Validation

  Scenario: Placing the Order
    Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
    When add "ADIDAS ORIGINAL" to the cart
    Then verify "ADIDAS ORIGINAL" is displayed to the cart
    When enter valid details and place the order
    Then verify the order is present in the order history page
