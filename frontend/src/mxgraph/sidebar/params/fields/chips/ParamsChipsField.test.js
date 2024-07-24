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

import { mount, shallow } from 'enzyme';
import React from 'react';

import ParamsChipsField from './ParamsChipsField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { noop } from 'lodash';
import { Typography } from '@material-ui/core';

describe('ParamsChipsField', () => {
    const init = (props = {}, returnProps = false, func = shallow) => {
        const defaultProps = {
            name: 'name',
            value: undefined,
            onChange: jest.fn(),
            ableToEdit: true
        };

        const wrapper = func(<ParamsChipsField {...defaultProps} {...props} />);

        return returnProps ? [wrapper, { ...defaultProps, ...props }] : [wrapper];
    };

    it('should render without crashes', () => {
        const [wrapper] = init();

        expect(wrapper.find(Autocomplete).exists()).toBeTruthy();
        expect(wrapper.find(Typography).exists()).toBeFalsy();
        expect(wrapper.find(Autocomplete).prop('disabled')).toBe(false);
    });

    it('should handle change', () => {
        const [wrapper, props] = init({}, true);

        wrapper.find(Autocomplete).prop('onChange')(null, ['joker@gmail.com']);

        expect(props.onChange).toHaveBeenCalledWith({
            target: { name: props.name, value: ['joker@gmail.com'] },
            persist: noop
        });
    });

    it('should support only view mode', () => {
        const [wrapper] = init({ ableToEdit: false });

        expect(wrapper.find(Autocomplete).prop('disabled')).toBe(true);
    });

    it('should not trigger value update', () => {
        const [_, props] = init({ value: ['joker@gmail.com'] }, true, mount);

        expect(props.onChange).not.toHaveBeenCalled();
    });

    it('should render tags', () => {
        const [wrapper] = init();

        const emails = ['Bruce@gmail.com', 'joker@gmail.com'];

        const chips = wrapper.find(Autocomplete).prop('renderTags')(
            emails,
            jest.fn()
        );

        expect(chips.length).toBe(emails.length);
    });

    it('should render empty tags', () => {
        const [wrapper] = init();

        const emails = undefined;

        const chips = wrapper.find(Autocomplete).prop('renderTags')(
            emails,
            jest.fn()
        );

        expect(chips).toBeUndefined();
    });

    it('should render input', () => {
        const [wrapper] = init();

        const input = wrapper.find(Autocomplete).prop('renderInput')({
            param: 'param'
        });

        expect(shallow(input).prop('param')).toBe('param');
    });

    it('should render a hint', () => {
        const [wrapper, prop] = init({ hint: 'hint' }, true);

        expect(wrapper.find(Typography).text()).toBe(prop.hint);
    });
});
