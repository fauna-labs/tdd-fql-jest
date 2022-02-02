// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import faunadb from 'faunadb';

import { Split } from '../lib/split';

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_KEY,
  domain: process.env.FAUNADB_DOMAIN || "db.fauna.com",
  port: parseInt(process.env.FAUNADB_PORT) || 443,
  scheme: process.env.FAUNADB_SCHEME || "https",
  checkNewVersion: false,
});

test('Split correctly separates an IPv4 address into four octets', async () => {
  // 1. Define the input to your expression as one or more constants.
  const input = {
    string: '127.0.0.1',
    delimiter: '.',
  };

  // 2. Define the expected output of your expression as a constant.
  const expected = ['127', '0', '0', '1'];

  // 3. Construct your FQL expression.
  const expr = Split(input.string, input.delimiter);

  // 4. Evaluate your FQL expression in Fauna and save the actual output.
  const actual = await faunaClient.query(expr);

  // 5. Compare the actual output to the expected output.
  expect(actual).toEqual(expected);
});

test('When the delimiter is not found, Split(str, del) = [str]', async () => {
  // 1. Define the input to your expression as one or more constants.
  const input = {
    string: 'Hello, world!',
    delimiter: '.',
  };

  // 2. Define the expected output of your expression as a constant.
  const expected = [input.string];

  // 3. Construct your FQL expression.
  const expr = Split(input.string, input.delimiter);

  // 4. Evaluate your FQL expression in Fauna and save the actual output.
  const actual = await faunaClient.query(expr);

  // 5. Compare the actual output to the expected output.
  expect(actual).toEqual(expected);
});

test('When the string only contains the delimiter, Split(str, del) = []', async () => {
  // 1. Define the input to your expression as one or more constants.
  const input = {
    string: '................',
    delimiter: '.',
  }

  // 2. Define the expected output of your expression as a constant.
  const expected = [];

  // 3. Construct your FQL expression.
  const expr = Split(input.string, input.delimiter);

  // 4. Evaluate your FQL expression in Fauna and save the actual output.
  const actual = await faunaClient.query(expr);

  // 5. Compare the actual output to the expected output.
  expect(actual).toEqual(expected);
});

// General framework for creating a new test.
/*
test('<description>', async () => {
  // 1. Define the input to your expression as one or more constants.
  const input = ...;
  
  // 2. Define the expected output of your expression as a constant.
  const expected = ...;
  
  // 3. Construct your FQL expression.
  const expr = ...;
  
  // 4. Evaluate your FQL expression in Fauna and save the actual output.
  const actual = await faunaClient.query(expr);
  
  // 5. Compare the actual output to the expected output.
  expect(actual).toEqual(expected);
});
 */