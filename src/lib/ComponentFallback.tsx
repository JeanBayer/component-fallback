import React, { Children } from "react";
import ReactDOMServer from "react-dom/server";

function isCorrectChildren(children: React.ReactNode) {
  const hasChildren = Children.count(children) > 0;
  const isValidHTML =
    ReactDOMServer.renderToStaticMarkup(children as JSX.Element).trim() !== "";

  return hasChildren && isValidHTML;
}

type FallbackComponentProps = {
  children?: React.ReactNode;
  fallBack?: React.ReactNode;
  isFallback?: boolean;
};

export const FallbackComponent = ({
  children,
  fallBack,
  isFallback,
}: FallbackComponentProps): JSX.Element => {
  if (isFallback) return <>{fallBack}</>;
  return isCorrectChildren(children) ? <>{children}</> : <>{fallBack}</>;
};

export function withFallback<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T & FallbackComponentProps): JSX.Element => {
    return (
      <FallbackComponent
        fallBack={props.fallBack}
        isFallback={props.isFallback}
      >
        <WrappedComponent {...props} />
      </FallbackComponent>
    );
  };
}
