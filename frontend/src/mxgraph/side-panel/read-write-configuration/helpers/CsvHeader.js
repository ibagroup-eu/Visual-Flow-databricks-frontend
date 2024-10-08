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

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { READWRITE } from '../../../constants';
import ParamsSwitchField from '../../../sidebar/params/fields/switch/ParamsSwitchField';

const CsvHeader = ({ value, onChange, ableToEdit }) => {
    const { t } = useTranslation();

    return (
        <ParamsSwitchField
            ableToEdit={ableToEdit}
            label={t('jobDesigner:writeConfiguration.Header')}
            name="header"
            value={value}
            onChange={onChange}
            type={READWRITE}
            defaultValue={false}
        />
    );
};

CsvHeader.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    ableToEdit: PropTypes.bool
};

export default CsvHeader;
