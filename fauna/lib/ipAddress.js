// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import faunadb from 'faunadb';
import { Split } from './split';

const q = faunadb.query
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
} = q;

export function IsValidNetmask(str) {
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

export function IsValidOctet(str) {
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
          Lambda("octet", IsValidOctet(Var("octet")))
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
      IsValidNetmask(Var("netmask"))
    )
  )
};
