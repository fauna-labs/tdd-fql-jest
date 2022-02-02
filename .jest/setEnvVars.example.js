// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

// Configuration for Fauna Dev (container image running locally)
process.env.FAUNADB_ADMIN_KEY = 'secret';
process.env.FAUNADB_DOMAIN = 'localhost';
process.env.FAUNADB_PORT = 8443;
process.env.FAUNADB_SCHEME = "http";

// Configuration for Classic Region Group
// process.env.FAUNADB_ADMIN_KEY = '<YOUR_KEY>';

// Configuration for EU Region Group
// process.env.FAUNADB_ADMIN_KEY = '<YOUR_KEY>';
// process.env.FAUNADB_DOMAIN = 'db.eu.fauna.com';

// Configuration for US Region Group
// process.env.FAUNADB_ADMIN_KEY = '<YOUR_KEY>';
// process.env.FAUNADB_DOMAIN = 'db.us.fauna.com';
