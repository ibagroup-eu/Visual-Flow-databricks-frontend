/*
 *  Copyright (c) 2021 IBA Group, a.s. All rights reserved.
 *
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import PopupForm from '../popup-form';
import ClusterModal from './ClusterModal';
import { useSelector } from 'react-redux';

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: jest.fn()
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
}));

describe('ClusterModal', () => {
    const init = (
        props = {},
        returnProps = false,
        nodeTypes = [],
        policies = [],
        versions = [],
        zones = [],
        func = shallow
    ) => {
        const defaultProps = {
            state: {
                POLICY: 'Unrestricted',
                AUTOSCALING_WORKERS: true,
                DESTINATION: 'dbfs',
                LOG_PATH: 'dbfs:/'
            },
            onChange: jest.fn(),
            display: true,
            onClose: jest.fn(),
            ableToEdit: true,
            setState: jest.fn()
        };
        useTranslation.mockImplementation(() => ({ t: x => x }));
        useSelector.mockImplementation(_ => nodeTypes);
        useSelector.mockImplementation(_ => policies);
        useSelector.mockImplementation(_ => versions);
        useSelector.mockImplementation(_ => zones);

        const wrapper = func(<ClusterModal {...defaultProps} {...props} />);

        return returnProps ? [wrapper, { ...defaultProps, ...props }] : [wrapper];
    };

    it('should render without crashes', () => {
        const [wrapper] = init();

        expect(wrapper.find(PopupForm).exists()).toBeTruthy();
        expect(wrapper.find(Button).length).toBe(2);
    });

    it('should handle "onClose"', () => {
        const [wrapper, props] = init({}, true);

        const [_, closeBtn] = wrapper.find(Button).map(x => x);

        closeBtn.simulate('click');

        expect(props.onClose).toHaveBeenCalled();
    });

    it('should handle "onSave"', () => {
        const addProps = {
            state: {
                CLUSTER_TAGS:
                    '{"type":"record","name":"schema_8c9168efd5c0463bbb85075440aed371","fields":[{"clusterKey":"key","value":"value"}]}',
                CLUSTER_SCRIPTS:
                    '{"type":"record","name":"schema_5e67602bd31b4238aa2d823f1902a945","fields":[{"source":"volumes","filePath":"/Volumes/","region":"auto"}]}'
            }
        };
        const [wrapper, props] = init(addProps, true, mount);

        const [saveBtn, _] = wrapper.find(Button).map(x => x);

        saveBtn.simulate('click');

        expect(props.setState).toHaveBeenCalled();
        // expect(props.onClose).toHaveBeenCalled();
    });
});
