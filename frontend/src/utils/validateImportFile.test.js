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

import { isNotValidFileContent, isNotValidJobPipeline } from './validateImportFile';

describe('validateImportFile', () => {
    describe('isNotValidFileContent', () => {
        it('should return true for json without jobs', () => {
            const data = { pipelines: [] };
            expect(isNotValidFileContent(data)).toBe(true);
        });

        it('should return false for empty jobs and pipelines', () => {
            const data = {
                pipelines: [],
                jobs: []
            };
            expect(isNotValidFileContent(data)).toBe(false);
        });
    });

    describe('isNotValidJobPipeline', () => {
        it('should return false for correct file', () => {
            const fileContent = {
                pipelines: [
                    {
                        spec: {
                            templates: [
                                {},
                                {
                                    dag: {
                                        tasks: [
                                            {
                                                arguments: {
                                                    parameters: [
                                                        {
                                                            name: 'name2',
                                                            value: 'value2'
                                                        },
                                                        {
                                                            name: 'pipelineId',
                                                            value: 'pipeline_id_1'
                                                        },
                                                        {
                                                            name: 'configMap',
                                                            value: 'job_id_1'
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        metadata: {
                            name: 'pipeline_id_1',
                            labels: {
                                app: 'vf-dev',
                                name: 'ReadCSV',
                                type: 'job'
                            }
                        }
                    }
                ],
                jobs: [
                    {
                        metadata: {
                            name: 'job_id_1',
                            labels: {
                                app: 'vf-dev',
                                name: 'ReadCSV',
                                type: 'job'
                            }
                        },
                        data: { DEPENDENT_PIPELINE_IDS: 'pipeline_id_1' }
                    }
                ]
            };
            const jobsList = fileContent.jobs;
            const pipelinesList = fileContent.pipelines;
            expect(isNotValidJobPipeline(pipelinesList, jobsList)).toBe(false);
        });

        it('should return true because of missing pipelineId', () => {
            const fileContent = {
                pipelines: [
                    {
                        spec: {
                            templates: [
                                {
                                    dag: {
                                        tasks: [
                                            {
                                                arguments: {
                                                    parameters: [
                                                        {
                                                            name: 'name2',
                                                            value: 'value2'
                                                        },
                                                        {
                                                            name: 'configMap',
                                                            value: 'job_id_1'
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        metadata: {
                            name: 'pipeline_id_1',
                            labels: {
                                app: 'vf-dev',
                                name: 'ReadCSV',
                                type: 'job'
                            }
                        }
                    }
                ],
                jobs: [
                    {
                        metadata: {
                            name: 'job_id_1',
                            labels: {
                                app: 'vf-dev',
                                name: 'ReadCSV',
                                type: 'job'
                            }
                        },
                        data: { DEPENDENT_PIPELINE_IDS: 'pipeline_id_1' }
                    }
                ]
            };
            const jobsList = fileContent.jobs;
            const pipelinesList = fileContent.pipelines;
            expect(isNotValidJobPipeline(pipelinesList, jobsList)).toBe(true);
        });

        it('should return true because of job nums ', () => {
            const fileContent = {
                pipelines: [
                    {
                        spec: {
                            templates: [
                                {
                                    dag: {
                                        tasks: [
                                            {
                                                arguments: {
                                                    parameters: [
                                                        {
                                                            name: 'name2',
                                                            value: 'value2'
                                                        },
                                                        {
                                                            name: 'pipelineId',
                                                            value: 'pipeline_id_1'
                                                        },
                                                        {
                                                            name: 'configMap',
                                                            value: 'job_id_1'
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        metadata: {
                            name: 'pipeline_id_1',
                            labels: {
                                app: 'vf-dev',
                                name: 'ReadCSV',
                                type: 'job'
                            }
                        }
                    }
                ],
                jobs: [
                    {
                        metadata: {
                            name: 'job_id_1',
                            labels: {
                                app: 'vf-dev',
                                name: 'ReadCSV',
                                type: 'job'
                            }
                        },
                        data: { DEPENDENT_PIPELINE_IDS: 'pipeline_id_1' }
                    },
                    {
                        metadata: {
                            name: 'job_id_2'
                        },
                        data: { DEPENDENT_PIPELINE_IDS: 'pipeline_id_2' }
                    }
                ]
            };
            const jobsList = fileContent.jobs;
            const pipelinesList = fileContent.pipelines;
            expect(isNotValidJobPipeline(pipelinesList, jobsList)).toBe(true);
        });

        it('should return true because of pipelines.metadata.name count', () => {
            const fileContent = {
                pipelines: [
                    {
                        spec: {
                            templates: [
                                {
                                    dag: {
                                        tasks: [
                                            {
                                                arguments: {
                                                    parameters: [
                                                        {
                                                            name: 'name2',
                                                            value: 'value2'
                                                        },
                                                        {
                                                            name: 'pipelineId',
                                                            value: 'pipeline_id_1'
                                                        },
                                                        {
                                                            name: 'configMap',
                                                            value: 'job_id_1'
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        metadata: {
                            name: 'pipeline_id_1',
                            labels: {
                                app: 'vf-dev',
                                name: 'ReadCSV',
                                type: 'job'
                            }
                        }
                    },
                    {
                        spec: {
                            templates: [
                                {
                                    dag: null
                                }
                            ]
                        },
                        metadata: {
                            name: 'pipeline_id_2',
                            labels: {
                                app: 'vf-dev',
                                name: 'ReadCSV',
                                type: 'job'
                            }
                        }
                    }
                ],
                jobs: [
                    {
                        metadata: {
                            name: 'job_id_1',
                            labels: {
                                app: 'vf-dev',
                                name: 'ReadCSV',
                                type: 'job'
                            }
                        },
                        data: { DEPENDENT_PIPELINE_IDS: 'pipeline_id_1' }
                    }
                ]
            };
            const jobsList = fileContent.jobs;
            const pipelinesList = fileContent.pipelines;
            expect(isNotValidJobPipeline(pipelinesList, jobsList)).toBe(true);
        });

        it('should return true because of wrong DEPENDENT_PIPELINE_IDS', () => {
            const fileContent = {
                pipelines: [
                    {
                        spec: {
                            templates: [
                                {},
                                {
                                    dag: {
                                        tasks: [
                                            {
                                                arguments: {
                                                    parameters: [
                                                        {
                                                            name: 'name2',
                                                            value: 'value2'
                                                        },
                                                        {
                                                            name: 'pipelineId',
                                                            value: 'pipeline_id_1'
                                                        },
                                                        {
                                                            name: 'configMap',
                                                            value: 'job_id_1'
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        metadata: {
                            name: 'pipeline_id_1',
                            labels: {
                                app: 'vf-dev',
                                name: 'ReadCSV',
                                type: 'job'
                            }
                        }
                    }
                ],
                jobs: [
                    {
                        metadata: {
                            name: 'job_id_1',
                            labels: {
                                app: 'vf-dev',
                                name: 'ReadCSV',
                                type: 'job'
                            }
                        },
                        data: { DEPENDENT_PIPELINE_IDS: 'pipeline_id_1_spoiled' }
                    }
                ]
            };
            const jobsList = fileContent.jobs;
            const pipelinesList = fileContent.pipelines;
            expect(isNotValidJobPipeline(pipelinesList, jobsList)).toBe(true);
        });
    });
});
