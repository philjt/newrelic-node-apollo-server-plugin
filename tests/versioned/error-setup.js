/*
 * Copyright 2022 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

/**
 * Defines a few resolves that throw different types of errors
 *
 * @param {Object} serverPkgExport an apollo server pkg export
 * @param {Object} resolvers gql resolver definition
 * @returns {Object} graphql schema
 */
module.exports = function setupErrorResolvers(serverPkgExport, resolvers) {
  const {
    gql,
    UserInputError,
    ValidationError,
    ApolloError,
    ForbiddenError,
    SyntaxError,
    AuthenticationError
  } = serverPkgExport

  class CustomError extends ApolloError {
    constructor(message) {
      super(message, 'CUSTOM_ERROR', { code: 'CUSTOM_ERROR' })
      Object.defineProperty(this, 'name', { value: 'CustomError' })
    }
  }

  resolvers.Query.boom = () => {
    throw new Error('Boom goes the dynamite!')
  }

  resolvers.Query.userInputError = () => {
    throw new UserInputError('user input error')
  }

  resolvers.Query.validationError = () => {
    throw new ValidationError('validation error')
  }

  resolvers.Query.forbiddenError = () => {
    throw new ForbiddenError('forbidden error')
  }

  resolvers.Query.customError = () => {
    throw new CustomError('custom error')
  }

  resolvers.Query.syntaxError = () => {
    throw new SyntaxError('syntax error')
  }

  resolvers.Query.authError = () => {
    throw new AuthenticationError('auth error')
  }

  return gql`
    extend type Query {
      boom: String
      userInputError: String
      validationError: String
      forbiddenError: String
      customError: String
      syntaxError: String
      authError: String
    }
  `
}
