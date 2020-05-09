@manager-operations
@reqiures-registered-customer-with-account
Feature: Customer search

    Scenario: Customer search in customers list
        Given manager logs in
        And manager opens customers list
        When manager types a last name of registered customer into a search input
        Then search should return recently created user with correct account number
