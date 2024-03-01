import React from "react";
import { authAndRedirectUrl, authenticationUrl } from "~utils/urls.ts";
import { fetcher } from "../../api/api.ts";
import ContentLoader from "../contentLoader/ContentLoader";
import useSWR from "swr";

type Props = {
  children?: React.ReactNode;
};

const redirectToIdPorten = () => {
  window.location.assign(authAndRedirectUrl());
};

const Authentication = ({ children }: Props) => {
  const { data, isLoading, error } = useSWR({ path: authenticationUrl }, fetcher, {
    shouldRetryOnError: false,
  });

  if (isLoading) {
    return <ContentLoader />;
  }

  if (!data?.authenticated || error) {
    redirectToIdPorten();
    return null;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default Authentication;
