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

import { isNil } from 'lodash';

const toLowerCase = val => (typeof val === 'string' ? val.toLowerCase() : val);

export const descendingComparator = (argA, argB) => {
    const a = toLowerCase(argA);
    const b = toLowerCase(argB);
    if ((isNil(b) && !isNil(a)) || b < a) {
        return -1;
    }
    if ((!isNil(b) && isNil(a)) || b > a) {
        return 1;
    }

    return 0;
};

export const getComparator = (order, orderBy) =>
    order === 'desc'
        ? (a, b) => descendingComparator(a[orderBy], b[orderBy])
        : (a, b) => -descendingComparator(a[orderBy], b[orderBy]);

export const stableSort = (data, comparator) => {
    const array = Array.isArray(data) ? data : Object.values(data);
    const stabilized = array.map((el, index) => [el, index]);
    stabilized.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilized.map(el => el[0]);
};
