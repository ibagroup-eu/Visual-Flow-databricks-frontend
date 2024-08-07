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

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import PopupForm from '../../../../components/popup-form';
import SQLEditor from '../../../../components/sql-editor';
import ModalConfirmButtons from '../connections-modal/confirmButtons/ModalConfirmButtons';
import useStyles from './SQLEditorModal.Styles';

const SQLEditorModal = ({
    display,
    title,
    currentValue,
    onClose,
    onSetValue,
    storageName,
    ableToEdit
}) => {
    const classes = useStyles();
    const [newValue, setNewValue] = useState(currentValue);

    useEffect(() => {
        setNewValue(currentValue);
    }, [currentValue, display]);

    return (
        <PopupForm display={display} onClose={onClose} title={title}>
            <Box className={classes.wrapper}>
                <SQLEditor
                    height="50vh"
                    placeholder={title}
                    value={newValue}
                    onChange={setNewValue}
                    storageName={storageName}
                    disabled={!ableToEdit}
                />
                <ModalConfirmButtons
                    ableToEdit={ableToEdit}
                    selectedValue={newValue}
                    onClose={onClose}
                    onSetValue={onSetValue}
                />
            </Box>
        </PopupForm>
    );
};

SQLEditorModal.propTypes = {
    display: PropTypes.bool,
    title: PropTypes.string,
    currentValue: PropTypes.string,
    onClose: PropTypes.func,
    onSetValue: PropTypes.func,
    storageName: PropTypes.string,
    ableToEdit: PropTypes.bool
};

export default SQLEditorModal;
