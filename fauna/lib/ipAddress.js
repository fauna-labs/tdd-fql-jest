// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import faunadb from 'faunadb';
import { Split } from './split';

const {
  All,
  And,
  Count,
  Equals,
  GTE,
  IsNumber,
  Lambda,
  Let,
  LTE,
  Map,
  Select,
  ToInteger,
  Var
} = faunadb.query;

function isValidNetmask(str) {
  return Let(
    {
      val: ToInteger(str)
    },
    And(
      IsNumber(Var("val")),
      GTE(Var("val"), 0),
      LTE(Var("val"), 32)
    )
  )
};

function isValidOctet(str) {
  return Let(
    {
      val: ToInteger(str)
    },
    And(
      IsNumber(Var("val")),
      GTE(Var("val"), 0),
      LTE(Var("val"), 255)
    )
  )
};

export function IsValidV4Address(str) {
  return Let(
    {
      octets: Split(str, ".")
    },
    And(
      Equals(Count(Var("octets")), 4),
      All(
        Map(
          Var("octets"),
          Lambda("octet", isValidOctet(Var("octet")))
        )
      )
    )
  )
};

export function IsValidV4CIDR(str) {
  return Let(
    {
      slices: Split(str, "/"),
      ipaddr: Select(0, Var("slices")),
      netmask: Select(1, Var("slices"))
    },
    And(
      Equals(Count(Var("slices")), 2),
      IsValidV4Address(Var("ipaddr")),
      isValidNetmask(Var("netmask"))
    )
  )
};
