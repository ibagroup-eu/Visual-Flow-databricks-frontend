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

import { shallow } from 'enzyme';
import React from 'react';
import ConnectionsTableRow from './ConnectionsTableRow';
import ActionButton from '../../../../components/action-button';

describe('ConnectionsTableRow', () => {
    let wrapper;
    let props;

    beforeEach(() => {
        props = {
            connection: {
                key: 'name',
                value: {
                    connectionName: 'name',
                    storageLabel: 'Label',
                    storage: 'storage',
                    endpoint: 'endpoint',
                    secketKey: '#key#'
                }
            },
            handleRemoveConnection: jest.fn(),
            confirmationWindow: jest.fn(),
            handleOpenConnection: jest.fn(),
            handlePingConnection: jest.fn(),
            editableMode: true
        };

        wrapper = shallow(<ConnectionsTableRow {...props} />);
    });

    it('should render component', () => {
        expect(wrapper).toBeDefined();
    });

    it('should calls onClick prop for IconButtons', () => {
        wrapper.find(ActionButton).forEach(obj => obj.prop('onClick')());
        expect(props.handleOpenConnection).toBeCalledTimes(2);
        expect(props.confirmationWindow).toBeCalledTimes(1);
        expect(props.handlePingConnection).toBeCalledTimes(1);
    });
});
