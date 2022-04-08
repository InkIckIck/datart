/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Space } from 'antd';
import useI18NPrefix from 'app/hooks/useI18NPrefix';
import { FC, memo, useCallback, useContext } from 'react';
import styled from 'styled-components/macro';
import { WidgetActionContext } from '../../ActionProvider/WidgetActionProvider';
import { BoardContext } from '../../BoardProvider/BoardProvider';
import { WidgetInfoContext } from '../../WidgetProvider/WidgetInfoProvider';
import { WidgetContext } from '../../WidgetProvider/WidgetProvider';
import {
  CancelLinkageIcon,
  CanLinkageIcon,
  ErrorIcon,
  LoadingIcon,
  LockIcon,
  WaitingIcon,
} from '../../WidgetToolBar/StatusIcon';
import { WidgetActionDropdown } from '../../WidgetToolBar/WidgetActionDropdown';

export const WidgetToolBar: FC = memo(() => {
  const { editing: boardEditing } = useContext(BoardContext);
  const { onWidgetClearLinkage, onWidgetGetData, onEditWidgetUnLock } =
    useContext(WidgetActionContext);
  const { loading, inLinking, rendered, errInfo } =
    useContext(WidgetInfoContext);
  const widget = useContext(WidgetContext);

  const onRefreshWidget = useCallback(() => {
    onWidgetGetData(widget);
  }, [onWidgetGetData, widget]);

  const onClearLinkage = useCallback(() => {
    onWidgetClearLinkage(widget);
  }, [onWidgetClearLinkage, widget]);

  const onUnLockWidget = useCallback(() => {
    onEditWidgetUnLock(widget);
  }, [onEditWidgetUnLock, widget]);

  const ssp = e => {
    e.stopPropagation();
  };
  const t = useI18NPrefix(`viz.widget.tips`);
  const renderLocking = () => {
    if (!boardEditing) return null;
    if (!widget.config?.lock) return null;
    return <LockIcon title={t('unlock')} onClick={onUnLockWidget} />;
  };
  const renderWaiting = () => {
    if (rendered) return null;
    return (
      <WaitingIcon
        onClick={onRefreshWidget}
        onMouseEnter={onRefreshWidget}
        title={t('waiting')}
      />
    );
  };

  const renderLinkage = () => {
    if (inLinking) {
      return (
        <CancelLinkageIcon
          title={t('cancelLinkage')}
          onClick={onClearLinkage}
        />
      );
    } else {
      return widget.config?.linkageConfig?.open ? (
        <CanLinkageIcon title={t('canLinkage')} />
      ) : null;
    }
  };
  const renderErrorInfo = (errInfo?: { [propName: string]: string }) => {
    if (!errInfo) return null;

    const errInfoValue = Object.values(errInfo);

    if (!errInfoValue.length) return null;

    const errHtml = (
      <div style={{ maxHeight: '200px', maxWidth: '400px', overflow: 'auto' }}>
        {errInfoValue.map((v, i) => {
          return <p key={i}>{String(v)}</p>;
        })}
      </div>
    );
    return <ErrorIcon errInfo={errHtml} />;
  };
  return (
    <StyleWrap onClick={ssp} className="widget-tool-bar">
      <Space size={0}>
        <LoadingIcon loading={loading} />
        {renderWaiting()}
        {renderErrorInfo(errInfo)}
        {renderLocking()}
        {renderLinkage()}
        <WidgetActionDropdown widget={widget} />
      </Space>
    </StyleWrap>
  );
});
const StyleWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 30;
  overflow: hidden;
  text-align: right;
  .widget-tool-dropdown {
    visibility: hidden;
  }
`;
export const EditToolBar: FC = memo(() => {
  const { editing: boardEditing } = useContext(BoardContext);
  const { onWidgetClearLinkage, onWidgetGetData, onEditWidgetUnLock } =
    useContext(WidgetActionContext);
  const { loading, inLinking, rendered, errInfo } =
    useContext(WidgetInfoContext);
  const widget = useContext(WidgetContext);

  const onRefreshWidget = useCallback(() => {
    onWidgetGetData(widget);
  }, [onWidgetGetData, widget]);

  const onClearLinkage = useCallback(() => {
    onWidgetClearLinkage(widget);
  }, [onWidgetClearLinkage, widget]);

  const onUnLockWidget = useCallback(() => {
    onEditWidgetUnLock(widget);
  }, [onEditWidgetUnLock, widget]);

  const ssp = e => {
    e.stopPropagation();
  };
  const t = useI18NPrefix(`viz.widget.tips`);
  const renderLocking = () => {
    if (!boardEditing) return null;
    if (!widget.config?.lock) return null;
    return <LockIcon title={t('unlock')} onClick={onUnLockWidget} />;
  };
  const renderWaiting = () => {
    if (rendered) return null;
    return (
      <WaitingIcon
        onClick={onRefreshWidget}
        onMouseEnter={onRefreshWidget}
        title={t('waiting')}
      />
    );
  };

  const renderLinkage = () => {
    if (inLinking) {
      return (
        <CancelLinkageIcon
          title={t('cancelLinkage')}
          onClick={onClearLinkage}
        />
      );
    } else {
      return widget.config?.linkageConfig?.open ? (
        <CanLinkageIcon title={t('canLinkage')} />
      ) : null;
    }
  };
  const renderErrorInfo = (errInfo?: { [propName: string]: string }) => {
    if (!errInfo) return null;

    const errInfoValue = Object.values(errInfo);

    if (!errInfoValue.length) return null;

    const errHtml = (
      <div style={{ maxHeight: '200px', maxWidth: '400px', overflow: 'auto' }}>
        {errInfoValue.map((v, i) => {
          return <p key={i}>{String(v)}</p>;
        })}
      </div>
    );
    return <ErrorIcon errInfo={errHtml} />;
  };
  return (
    <StyleWrap onClick={ssp} className="widget-tool-bar">
      <Space size={0}>
        <LoadingIcon loading={loading} />
        {renderWaiting()}
        {renderErrorInfo(errInfo)}
        {renderLocking()}
        {renderLinkage()}
        <WidgetActionDropdown widget={widget} />
      </Space>
    </StyleWrap>
  );
});
