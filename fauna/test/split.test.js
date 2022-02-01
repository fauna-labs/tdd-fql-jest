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
  const string = '127.0.0.1';
  const delimiter = '.';
  const expected = ['127', '0', '0', '1'];
  // If you trust JavaScript's implementation of split, you can use it here.
  // const expected = string.split('.');

  const result = await faunaClient.query(
    Split(string, delimiter)
  );

  expect(result).toEqual(expected);
});

test('When the delimiter is not found, Split(str, del) = [str]', async () => {
  const string = 'Hello, world!';
  const delimiter = '.';
  const expected = [string];

  const result = await faunaClient.query(
    Split(string, delimiter)
  );

  expect(result).toEqual(expected);
});

test('When the string only contains the delimiter, Split(str, del) = []', async () => {
  const string = '................';
  const delimiter = '.';
  const expected = [];

  const result = await faunaClient.query(
    Split(string, delimiter)
  );

  expect(result).toEqual(expected);
});