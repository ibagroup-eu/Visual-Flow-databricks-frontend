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

import { TextField } from '@material-ui/core';
import { shallow } from 'enzyme';
import React from 'react';
import AiConfiguration from './AiConfiguration';

describe('AiConfiguration', () => {
    let wrapper;
    let props;

    beforeEach(() => {
        props = {
            state: { name: 'testname' },
            ableToEdit: true,
            onChange: jest.fn()
        };

        wrapper = shallow(<AiConfiguration {...props} />);
    });

    it('should render component', () => {
        expect(wrapper).toBeDefined();
    });

    it('should calls value prop with condition value', () => {
        wrapper.setProps({
            state: { name: 'testname', condition: 'testcondition' }
        });
        expect(wrapper.find(TextField).prop('value')).toBe('testcondition');
    });

    it('should calls onChange prop', () => {
        wrapper.find(TextField).prop('onChange')({
            target: { name: 'testname', value: 'test' }
        });
    });
});
