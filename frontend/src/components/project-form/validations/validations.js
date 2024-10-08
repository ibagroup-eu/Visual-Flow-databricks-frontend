/*
 * Copyright (c) 2021 IBA Group, a.s. All rights reserved.
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DATABRICKS } from '../../../mxgraph/constants';
import {
    isCorrectDescription,
    isCorrectName,
    isPositiveNumber,
    isValidDemoLimitDate,
    isValidDatabricksParams
} from '../../../utils/projectValidations';

export const isLimitsEmpty = ({
    limitsCpu,
    limitsMemory,
    requestsCpu,
    requestsMemory
}) => !limitsCpu || !limitsMemory || !requestsCpu || !requestsMemory;

export const isEmpty = ({ name, limits }) => !name || isLimitsEmpty(limits);

export const isValidationLimitsPassed = ({
    limitsCpu,
    limitsMemory,
    requestsCpu,
    requestsMemory
}) =>
    isPositiveNumber(Number(limitsCpu)) &&
    isPositiveNumber(Number(limitsMemory)) &&
    isPositiveNumber(Number(requestsCpu)) &&
    isPositiveNumber(Number(requestsMemory));

export const isValidationDemoLimitsPassed = ({
    jobsNumAllowed,
    pipelinesNumAllowed,
    expirationDate
}) =>
    isPositiveNumber(Number(jobsNumAllowed)) &&
    isPositiveNumber(Number(pipelinesNumAllowed)) &&
    isValidDemoLimitDate(expirationDate);

export const isValidationPassed = ({ name, description, limits }) =>
    isCorrectName(name) &&
    isCorrectDescription(description) &&
    isValidationLimitsPassed(limits);

export const isLimitsAndDemoLimitsValidationsPassed = ({
    name,
    description,
    limits,
    demo,
    demoLimits
}) =>
    isValidationPassed({ name, description, limits }) &&
    (demo ? isValidationDemoLimitsPassed(demoLimits) : true);

export const isDatabricksValidationPassed = ({
    host,
    authentication: { token, clientId, secret, authenticationType },
    pathToFile
}) =>
    window.PLATFORM === DATABRICKS
        ? isValidDatabricksParams({
              host,
              token,
              clientId,
              secret,
              authenticationType,
              pathToFile
          })
        : true;
