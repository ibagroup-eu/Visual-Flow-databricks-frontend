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

import cron from './cron';
import axiosInstance from './axiosInstance';

describe('cron', () => {
    const projectId = 'some_id';
    const pipelineId = 'some_id';
    const expected = { data: {} };

    it('should create pipeline cron', () => {
        jest.spyOn(axiosInstance, 'post').mockResolvedValue(expected);
        return cron.createCron(projectId, pipelineId, 1).then(result => {
            expect(result).toEqual(expected);
        });
    });

    it('should get pipeline cron', () => {
        const requestURL = `/project/${projectId}/pipeline/${pipelineId}/cron`;
        const spy = jest.spyOn(axiosInstance, 'get').mockResolvedValue(expected);
        return cron.getCron(projectId, pipelineId).then(result => {
            expect(result).toEqual(expected);
            expect(spy).toHaveBeenCalledWith(requestURL);
        });
    });

    it('should update pipeline cron', () => {
        jest.spyOn(axiosInstance, 'put').mockResolvedValue(expected);
        return cron.updateCron(projectId, pipelineId, 1).then(result => {
            expect(result).toEqual(expected);
        });
    });
});
