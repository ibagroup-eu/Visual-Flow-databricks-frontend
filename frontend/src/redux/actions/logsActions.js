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

import { FETCH_LOGS_FAIL, FETCH_LOGS_START, FETCH_LOGS_SUCCESS } from './types';
import apiJobs from '../../api/jobs';
import apiPipelines from '../../api/pipelines';

export const fetchJobLogs = (projectId, jobId) => dispatch => {
    dispatch({
        type: FETCH_LOGS_START
    });

    return apiJobs.getJobLogs(projectId, jobId).then(
        response =>
            dispatch({
                type: FETCH_LOGS_SUCCESS,
                payload: response.data
            }),
        error =>
            dispatch({
                type: FETCH_LOGS_FAIL,
                payload: { error }
            })
    );
};

export const fetchDatabricksJobLogs = (
    projectId,
    pipelineId,
    jobName
) => dispatch => {
    dispatch({
        type: FETCH_LOGS_START
    });

    return apiJobs.getDatabricksJobLogs(projectId, pipelineId, jobName).then(
        response =>
            dispatch({
                type: FETCH_LOGS_SUCCESS,
                payload: response.data
            }),
        error =>
            dispatch({
                type: FETCH_LOGS_FAIL,
                payload: { error }
            })
    );
};

export const fetchContainerLogs = (projectId, pipelineId, nodeId) => dispatch => {
    dispatch({ type: FETCH_LOGS_START });

    return apiPipelines.getPipelineLogs(projectId, pipelineId, nodeId).then(
        response => dispatch({ type: FETCH_LOGS_SUCCESS, payload: response.data }),
        error => dispatch({ type: FETCH_LOGS_FAIL, payload: { error } })
    );
};

export const fetchJobHistoryLogs = (projectId, jobId, logId) => dispatch => {
    dispatch({ type: FETCH_LOGS_START });

    return apiJobs.getJobHistoryLogs(projectId, jobId, logId).then(
        response =>
            dispatch({
                type: FETCH_LOGS_SUCCESS,
                payload: response.data
            }),
        error =>
            dispatch({
                type: FETCH_LOGS_FAIL,
                payload: { error }
            })
    );
};
