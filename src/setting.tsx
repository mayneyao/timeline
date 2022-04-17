import { Form } from '@vikadata/components';
import { useActiveViewId, useCloudStorage, useFields, useSettingsButton } from '@vikadata/widget-sdk';
import { IConfigFormData } from './interface';
import React from 'react';
import { FieldSelect } from './components/field_select';


export const Setting: React.FC = () => {
  const [isSettingOpened] = useSettingsButton();
  const activeViewId = useActiveViewId();
  const fields = useFields(activeViewId);
  const primaryField = fields.find(field => field.isPrimary);
  const fieldEnums = fields.map(field => field.id);
  const fieldEnumNames = fields.map(field => field.name);
  const [formData, setFormData, editable] = useCloudStorage<IConfigFormData>('FormData', {
    contentField: primaryField ? primaryField.id : '',
    personField: primaryField ? primaryField.id : '',
    timeField: primaryField ? primaryField.id : '',
    avatarField: primaryField ? primaryField.id : '',
  });

  const onFormChange = (data: any) => {
    setFormData(data.formData);
  };

  const schema: any = {
    type: 'object',
    properties: {
      personField: {
        type: 'string',
        title: '人物对应字段',
        enum: fieldEnums,
        enumNames: fieldEnumNames,
      },
      contentField: {
        type: 'string',
        title: '内容对应字段',
        enum: fieldEnums,
        enumNames: fieldEnumNames,
      },
      timeField: {
        type: 'string',
        title: '时间对应字段',
        enum: fieldEnums,
        enumNames: fieldEnumNames,
      },
      avatarField: {
        type: 'string',
        title: '头像对应字段',
        enum: fieldEnums,
        enumNames: fieldEnumNames,
      },
    }
  }
  const uiSchema = {
    personField: {
      'ui:widget': props => <FieldSelect {...props} />,
    },
    contentField: {
      'ui:widget': props => <FieldSelect {...props} />,
    },
    timeField: {
      'ui:widget': props => <FieldSelect {...props} />,
    }
  }
  return isSettingOpened ? (
    <div style={{ flexShrink: 0, width: '300px', borderLeft: 'solid 1px gainsboro', padding: '0 16px' }}>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={onFormChange}
        children={<div></div>}
      />
    </div>
  ) : null;
};
