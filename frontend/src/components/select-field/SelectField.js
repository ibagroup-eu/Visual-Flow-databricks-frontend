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
import { TextField, Box, InputAdornment } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { has } from 'lodash';
import classNames from 'classnames';
import ClearButton from '../../mxgraph/side-panel/helpers/ClearButton';
import useStyles from './SelectField.Styles';
import getMenuItems from '../../mxgraph/side-panel/helpers/getMenuItems';
import { READWRITE } from '../../mxgraph/constants';
import getMenuItemsCluster from '../../mxgraph/side-panel/helpers/getMenuItemsCluster';

const SelectField = ({
    ableToEdit,
    label,
    name,
    value,
    adornment,
    handleInputChange,
    menuItems,
    type,
    defaultValue,
    required,
    connection,
    className,
    closeIcon = true
}) => {
    const classes = useStyles();
    const [selectedOptionObject, setSelectedOptionObject] = React.useState();
    const { t } = useTranslation();
    React.useEffect(() => {
        if (!value && defaultValue) {
            const event = {
                target: {
                    name,
                    value: defaultValue
                }
            };
            type === READWRITE
                ? handleInputChange(event)
                : handleInputChange(event.target.name, event.target.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        setSelectedOptionObject(menuItems?.find(item => item.value === value));
    }, [value, menuItems]);

    return (
        <Box className={classes.wrapper}>
            <TextField
                disabled={has(connection, name) || !ableToEdit}
                label={t(label)}
                placeholder={t(label)}
                variant="outlined"
                fullWidth
                select
                SelectProps={{
                    MenuProps: {
                        className: classNames(classes.menu, className)
                    },
                    renderValue: () => selectedOptionObject?.label
                }}
                InputProps={{
                    endAdornment: adornment && (
                        <InputAdornment position="end">{adornment}</InputAdornment>
                    )
                }}
                name={name}
                value={value || ''}
                onChange={
                    type === READWRITE
                        ? handleInputChange
                        : event =>
                              handleInputChange(
                                  event.target.name,
                                  event.target.value
                              )
                }
                required={required}
            >
                {menuItems.length && menuItems[0].entity
                    ? getMenuItemsCluster(menuItems)
                    : getMenuItems(menuItems)}
            </TextField>
            {closeIcon && (
                <ClearButton
                    name={name}
                    value={value}
                    ableToEdit={!has(connection, name) && ableToEdit}
                    handleInputChange={handleInputChange}
                    type={type}
                />
            )}
        </Box>
    );
};

SelectField.propTypes = {
    ableToEdit: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    adornment: PropTypes.string,
    handleInputChange: PropTypes.func,
    menuItems: PropTypes.array,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    required: PropTypes.bool,
    connection: PropTypes.object,
    className: PropTypes.string,
    closeIcon: PropTypes.bool
};

export default SelectField;
