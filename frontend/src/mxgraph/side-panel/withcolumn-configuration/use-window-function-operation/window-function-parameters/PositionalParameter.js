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
import { TextField, Box } from '@material-ui/core';
import useStyles from '../UseWindowFunctionOperation.Styles';

const PositionalParameter = ({ state, ableToEdit, handleInputChange }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    return (
        <>
            <TextField
                disabled={!ableToEdit}
                label={t('jobDesigner:withColumnConfiguration.expression')}
                placeholder={t('jobDesigner:withColumnConfiguration.expression')}
                variant="outlined"
                fullWidth
                multiline
                minRows={16}
                name="option.expression"
                value={state['option.expression'] || ''}
                onChange={handleInputChange}
                required
            />
            <Box className={classes.partitionBy}>
                <TextField
                    disabled={!ableToEdit}
                    label={t('jobDesigner:withColumnConfiguration.offset')}
                    placeholder={t('jobDesigner:withColumnConfiguration.offset')}
                    variant="outlined"
                    fullWidth
                    name="option.offset"
                    value={state['option.offset'] || ''}
                    onChange={handleInputChange}
                />
            </Box>
            <TextField
                disabled={!ableToEdit}
                label={t('jobDesigner:withColumnConfiguration.defaultValue')}
                placeholder={t('jobDesigner:withColumnConfiguration.defaultValue')}
                variant="outlined"
                fullWidth
                name="option.defaultValue"
                value={state['option.defaultValue'] || ''}
                onChange={handleInputChange}
            />
        </>
    );
};

PositionalParameter.propTypes = {
    state: PropTypes.object,
    ableToEdit: PropTypes.bool,
    handleInputChange: PropTypes.func
};

export default PositionalParameter;