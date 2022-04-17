import { initializeWidget, useCloudStorage, useExpandRecord, useRecordsAll } from '@vikadata/widget-sdk';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { DataSet, Timeline, TimelineOptions } from 'vis-timeline/standalone';
import { ItemBox } from './components/item_box';
import { IConfigFormData } from './interface';
import { Setting } from './setting';


export const VikaTimeline: React.FC = () => {
  const records = useRecordsAll();
  const [formData] = useCloudStorage<IConfigFormData>('FormData');
  const [timeline, setTimeline] = useState<Timeline>();
  const expandRecord = useExpandRecord();
  // Configuration for the Timeline
  const options: TimelineOptions & { template: any } = {
    height: '100%',
    editable: false,
    template: function (item, element) {
      if (!item) {
        return;
      }
      ReactDOM.render(<ItemBox item={item} />, element) as any;
      return '' as any;
    },
  };

  const items: any = records.filter(record => record.getCellValue(formData.timeField)).map(record => {
    return {
      id: record.id,
      content: record.getCellValueString(formData.contentField),
      avatar: record.getCellValue(formData.avatarField),
      person: record.getCellValueString(formData.personField),
      start: new Date(record.getCellValue(formData.timeField), 0, 0),
      expandRecord,
    }
  })

  useEffect(() => {
    if (timeline) {
      timeline.redraw();
      return;
    }
    const container = document.getElementById('visualization');
    // Create a DataSet (allows two way data-binding)
    if (!items.length) {
      return;
    }
    // Create a Timeline
    const initTimeline = new Timeline(container!, new DataSet(items), options);
    setTimeout(() => {
      initTimeline.redraw();
    }, 300);
    setTimeline(initTimeline);
  }, [items, timeline])

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1, overflow: 'auto', padding: '0 8px', paddingBottom: '200px' }}>
        <div id="visualization" style={{
          height: '100%'
        }} />
      </div>
      <Setting />
    </div>
  );
};

initializeWidget(VikaTimeline, process.env.WIDGET_PACKAGE_ID);
