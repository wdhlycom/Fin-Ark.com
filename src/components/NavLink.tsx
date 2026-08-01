import type { ReactNode, MouseEvent, CSSProperties, AnchorHTMLAttributes } from 'react';
import { isModifiedClick } from '../nav';

type Props = {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** 额外的点击处理（如关闭移动端菜单）；导航逻辑仍由组件内部处理 */
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'style' | 'children' | 'onClick'>;

/**
 * 原生 <a> 封装：href 为真实路径（如 /s/insurance），可被搜索引擎抓取，右键"在新标签页打开"有效。
 * 左键（无修饰键）拦截默认行为并用 history.pushState 切换 SPA 视图（随后派发 popstate 由 App 同步状态）；
 * 右/中键或带修饰键则放行，由浏览器原生处理（新标签页 / 新窗口），真实路径可被原生打开。
 */
export default function NavLink({
  href,
  className,
  style,
  children,
  onClick: externalOnClick,
  ...rest
}: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isModifiedClick(e)) return; // 交给浏览器：新标签页 / 中键
    e.preventDefault();
    if (window.location.pathname === href) {
      window.dispatchEvent(new PopStateEvent('popstate')); // 同视图：回顶部
    } else {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate')); // 通知 App 同步视图
    }
    externalOnClick?.(e); // 额外处理（如关闭移动端菜单）
  };

  return (
    <a href={href} onClick={handleClick} className={className} style={style} {...rest}>
      {children}
    </a>
  );
}
