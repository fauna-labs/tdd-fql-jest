// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import faunadb from 'faunadb';

import { 
  IsValidV4Address,
  IsValidV4CIDR
} from '../lib/ipAddress';

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_KEY,
  domain: process.env.FAUNADB_DOMAIN || "db.fauna.com",
  port: parseInt(process.env.FAUNADB_PORT) || 443,
  scheme: process.env.FAUNADB_SCHEME || "https",
  checkNewVersion: false,
});

// ----------------------------------------------------------------------------
// IsValidV4Address tests
// ----------------------------------------------------------------------------
test('IsValidV4Address correctly identifies a valid IPv4 address', async () => {
  const input = '127.0.0.1';
  const expected = true;

  const expr = IsValidV4Address(input);
  const actual = await faunaClient.query(expr);

  expect(actual).toEqual(expected);
});

test('IsValidV4Address correctly identifies an invalid address with three octets', async () => {
  const input = '127.0.0';
  const expected = false;

  const expr = IsValidV4Address(input);
  const actual = await faunaClient.query(expr);

  expect(actual).toEqual(expected);
});

test('IsValidV4Address correctly identifies a negative octect as invalid', async () => {
  const input = '127.-24.0.1';
  const expected = false;

  const expr = IsValidV4Address(input);
  const actual = await faunaClient.query(expr);

  expect(actual).toEqual(expected);
});

test('IsValidV4Address correctly identifies an out of bounds octect as invalid', async () => {
  const input = '127.256.0.1';
  const expected = false;

  const expr = IsValidV4Address(input);
  const actual = await faunaClient.query(expr);

  expect(actual).toEqual(expected);
});

test('IsValidV4Address throws an error when provided a non-integer argument', async () => {
  const input = '127.not an integer.0.1';

  const expr = IsValidV4Address(input);
  const q = async () => {
    await faunaClient.query(expr);
  };

  await expect(q).rejects.toThrow();
});

// ----------------------------------------------------------------------------
// IsValidV4CIDR tests
// ----------------------------------------------------------------------------
test('IsValidV4CIDR correctly identifies a valid CIDR block', async () => {
  const input = '10.8.3.0/24';
  const expected = true;

  const expr = IsValidV4CIDR(input);
  const actual = await faunaClient.query(expr);

  expect(actual).toEqual(expected);
});

test('IsValidV4CIDR correctly identifies an invalid CIDR block with extra forward slashes', async () => {
  const input = '10.8.3.0/24/8';
  const expected = false;

  const expr = IsValidV4CIDR(input);
  const actual = await faunaClient.query(expr);

  expect(actual).toEqual(expected);
});

test('IsValidV4CIDR correctly identifies a negative netmask as invalid', async () => {
  const input = '127.0.0.1/-24';
  const expected = false;

  const expr = IsValidV4CIDR(input);
  const actual = await faunaClient.query(expr);

  expect(actual).toEqual(expected);
});

test('IsValidV4CIDR correctly identifies an out of bounds netmask as invalid', async () => {
  const input = '127.0.0.1/33';
  const expected = false;

  const expr = IsValidV4CIDR(input);
  const actual = await faunaClient.query(expr);

  expect(actual).toEqual(expected);
});

test('IsValidV4CIDR throws an error when provided a non-integer netmask', async () => {
  const input = '127.0.0.1/not an integer';

  const expr = IsValidV4CIDR(input);
  const q = async () => {
    await faunaClient.query(expr);
  };

  await expect(q).rejects.toThrow();
});
