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
import { Box, Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { camelCase, has } from 'lodash';
import classNames from 'classnames';
import { TuneOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ClearButton from '../../mxgraph/side-panel/helpers/ClearButton';
import { READWRITE } from '../../mxgraph/constants';
import useStyles from './ReadWriteTextField.Styles';

export const valueIsLink = value =>
    typeof value === 'string' &&
    value?.length > 4 &&
    value?.charAt(0) === '#' &&
    value?.charAt(value.length - 1) === '#';

const ReadWriteTextField = ({
    field,
    rows,
    nameWIthPoint,
    inputValues,
    handleInputChange,
    openModal,
    ableToEdit,
    hidden,
    disabled,
    connection,
    defaultValue,
    required
}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const fieldName = nameWIthPoint ? field : camelCase(field);
    const [visible, setVisibility] = React.useState(false);
    const hiddenField = visible ? <Visibility /> : <VisibilityOff />;

    React.useEffect(() => {
        if (!inputValues[fieldName] && defaultValue) {
            const event = {
                target: {
                    name: fieldName,
                    value: defaultValue
                }
            };
            handleInputChange(event);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const iconBtn = () => {
        let btn = (
            <IconButton
                className={classNames(classes.button, {
                    [classes.multilineButton]: rows > 1
                })}
                onClick={() => openModal(fieldName)}
            >
                <TuneOutlined />
            </IconButton>
        );
        if (rows > 1) {
            btn = (
                <Grid container className={classes.multilineGrid}>
                    {btn}
                </Grid>
            );
        }
        return btn;
    };

    return (
        <Box className={classes.fieldWrapper}>
            <TextField
                label={t(
                    `jobDesigner:readConfiguration.${field.replace(/[\s.]/g, '')}`
                )}
                placeholder={t(
                    `jobDesigner:readConfiguration.${field.replace(/[\s.]/g, '')}`
                )}
                variant="outlined"
                fullWidth
                multiline={rows > 1}
                minRows={rows}
                type={
                    !visible && hidden && !valueIsLink(inputValues[fieldName])
                        ? 'password'
                        : 'text'
                }
                disabled={
                    hidden ||
                    has(connection, fieldName) ||
                    !ableToEdit ||
                    valueIsLink(inputValues[fieldName])
                }
                name={fieldName}
                value={inputValues[fieldName] || ''}
                onChange={handleInputChange}
                InputProps={{
                    endAdornment: !disabled && (
                        <InputAdornment position="end">
                            {!valueIsLink(inputValues[fieldName]) && hidden ? (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setVisibility(!visible)}
                                    className={classes.button}
                                >
                                    {hiddenField}
                                </IconButton>
                            ) : null}
                            {iconBtn()}
                        </InputAdornment>
                    ),
                    classes: {
                        disabled: classes.disabled
                    }
                }}
                required={required}
            />
            <ClearButton
                name={fieldName}
                value={inputValues[fieldName]}
                ableToEdit={!has(connection, fieldName) && ableToEdit}
                handleInputChange={handleInputChange}
                type={READWRITE}
            />
        </Box>
    );
};

ReadWriteTextField.propTypes = {
    field: PropTypes.string,
    inputValues: PropTypes.object,
    rows: PropTypes.number,
    handleInputChange: PropTypes.func,
    openModal: PropTypes.func,
    ableToEdit: PropTypes.bool,
    nameWIthPoint: PropTypes.bool,
    required: PropTypes.bool,
    hidden: PropTypes.bool,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    connection: PropTypes.object
};

export default ReadWriteTextField;
